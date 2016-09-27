using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Data.Objects.DataClasses;

using FPCS.Core.jqGrid;

namespace FPCS.Core.Extensions
{
    /// <summary>
    /// helper class provides number of methods to deal with sorting and filtering by entity property name
    /// </summary>
    public static class LinqExtensions
    {
        /// <summary>Orders the sequence by specific column and direction.</summary>
        /// <param name="query">The query.</param>
        /// <param name="sortColumn">The sort column.</param>
        /// <param name="direction">null, empty, "asc" for ascending or anything other for descending</param>
        public static IQueryable<T> OrderBy<T>(this IQueryable<T> query, String sortColumn, String direction)
        {
            var parameter = CreateParameter(query);
            var members = GetMembers(sortColumn, parameter);

            var orderByLambdas = CreateOrderByLambdas(parameter, members);

            var result = CreateFirstOrderQuery(query, direction, orderByLambdas, members);
            result = CreateAllNextOrderQueries(query, result, direction, orderByLambdas, members);

            return query.Provider.CreateQuery<T>(result);
        }

        /// <summary>
        /// filter query by specified column name(property path of entity), value and comparision operation
        /// </summary>
        /// <typeparam name="T">type of entity</typeparam>
        /// <param name="query"></param>
        /// <param name="column">property name or path</param>
        /// <param name="value">value to test</param>
        /// <param name="operation">test operation</param>
        /// <returns>filtered query</returns>
        public static IQueryable<T> Where<T>(this IQueryable<T> query, String column, Object value, FilterOperation operation)
        {
            if (String.IsNullOrEmpty(column))
            {
                return query;
            }

            var parameter = CreateParameter(query);
            var members = GetMembers(column, parameter);

            Expression condition;
            if (IsOrdinalOperation(operation))
            {
                List<Expression> filter;
                try
                {
                    filter = TryToSetFilter(value, members.First());
                }
                catch (FormatException)
                {
                    return query.Where(x => false);
                }

                condition = CreateOrdinalCondition(operation, filter, members.First());
            }
            else
            {
                condition = CreateStringCondition(value, operation, members);
            }

            return CreateWhereQuery(query, parameter, condition);
        }

        #region Private methods

        private static ParameterExpression CreateParameter<T>(IQueryable<T> query)
        {
            return Expression.Parameter(query.ElementType, "p");
        }

        private static List<Expression> GetMembers(string stringExpression, Expression parameter)
        {
            const string Brackets = "()";
            var cols = stringExpression.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries);

            //Темную сторону в этом запросе чую я, пусть магистры ордена рефакторят его
            return cols.Select(col => col.Split('.').Aggregate<string, Expression>(null,
                (current, property) =>
                    property.EndsWith(Brackets)
                        ? !typeof(String).IsAssignableFrom((current ?? parameter).Type)
                        && typeof(IEnumerable).IsAssignableFrom((current ?? parameter).Type)
                            ? Expression.Call(typeof(Enumerable), property.Replace(Brackets, String.Empty), new[] { GetElementType((current ?? parameter).Type) }, current)
                            : (Expression)Expression.Call((current ?? parameter), property.Replace(Brackets, String.Empty), null, new Expression[0])

                        : Expression.Property(current ?? parameter, property))).ToList();
        }

        private static List<LambdaExpression> CreateOrderByLambdas(ParameterExpression parameter, IEnumerable<Expression> members)
        {
            return members.Select(member => Expression.Lambda(member, parameter)).ToList();
        }


        private static MethodCallExpression CreateFirstOrderQuery<T>(
            IQueryable<T> query, string direction, IEnumerable<LambdaExpression> orderByLambdas, IEnumerable<Expression> members)
        {
            var firstMethodName = GetFirstMethodName(direction);

            var result = CreateOrderQuery(query, orderByLambdas.First(), query.Expression, members.First(), firstMethodName);
            return result;
        }

        private static MethodCallExpression CreateAllNextOrderQueries(
            IQueryable query, MethodCallExpression result, string direction, IList<LambdaExpression> orderByLambdas, List<Expression> members)
        {
            var nextMethodName = GetNextMethodName(direction);
            for (var i = 1; i < orderByLambdas.Count; i++)
            {
                result = CreateOrderQuery(query, orderByLambdas[i], result, members[i], nextMethodName);
            }
            return result;
        }

        private static MethodCallExpression CreateOrderQuery(IQueryable query, Expression orderByLambda, Expression expression, Expression memberAccess, string firstMethodName)
        {
            return Expression.Call(
                typeof(Queryable),
                firstMethodName,
                new[] { query.ElementType, memberAccess.Type },
                expression,
                Expression.Quote(orderByLambda));
        }

        private static string GetNextMethodName(string direction)
        {
            return string.Format("ThenBy{0}",
                string.IsNullOrEmpty(direction) || direction.ToLower() == "asc" ? "" : "Descending");
        }

        private static string GetFirstMethodName(string direction)
        {
            return string.Format("OrderBy{0}",
                string.IsNullOrEmpty(direction) || direction.ToLower() == "asc" ? "" : "Descending");
        }

        private static bool IsOrdinalOperation(FilterOperation operation)
        {
            return operation != FilterOperation.StartsWith && operation != FilterOperation.Contains;
        }

        private static IQueryable<T> CreateWhereQuery<T>(IQueryable<T> query, ParameterExpression parameter, Expression condition)
        {
            var result = Expression.Call(
                typeof(Queryable),
                "Where",
                new[] { query.ElementType },
                query.Expression,
                Expression.Lambda(condition, parameter));

            return query.Provider.CreateQuery<T>(result);
        }

        private static Expression CreateStringCondition(object value, FilterOperation operation, IEnumerable<Expression> members)
        {
            var stringValue = Convert.ToString(value).ToLower();

            Expression resultExpression = null;
            var emptyString = Expression.Constant("");
            foreach (var member in members)
            {
                var currentExpression = GetCurrentExpression(member);

                resultExpression = ChangeResultExpression(emptyString, currentExpression, resultExpression);
            }

            resultExpression = Expression.Call(resultExpression, "ToLower", null, new Expression[0]);

            var condition = CreateCondition(operation, stringValue, resultExpression);
            return condition;
        }

        private static MethodCallExpression CreateCondition(FilterOperation operation, string stringValue, Expression resultExpression)
        {
            return Expression.Call(
                resultExpression,
                typeof(string).GetMethod(operation.ToString(), new[] { typeof(String) }),
                new Expression[] { Expression.Constant(stringValue, typeof(String)) });
        }

        private static Expression ChangeResultExpression(
            Expression emptyString, Expression currentExpression, Expression resultExpression)
        {
            if (resultExpression == null)
            {
                resultExpression = Expression.Coalesce(currentExpression, emptyString);
            }
            else
            {
                resultExpression = CallConcatForExpressoin(resultExpression, Expression.Constant(" "));
                resultExpression = CallConcatForExpressoin(resultExpression, Expression.Coalesce(currentExpression, emptyString));
            }
            return resultExpression;
        }

        private static MethodCallExpression CallConcatForExpressoin(Expression resultExpression, Expression whatToConcat)
        {
            return Expression.Call(
                null,
                typeof(LinqExtensions).GetMethod("Concat", new[] { typeof(String), typeof(String) }),
                new[] { resultExpression, whatToConcat });
        }

        private static Expression GetCurrentExpression(Expression member)
        {
            return member.Type == typeof(String)
                       ? member
                       : Expression.Call(
                           null,
                           typeof(LinqExtensions).GetMethod("ConvertToString", new[] { member.Type }),
                           new[] { member });
        }

        private static Expression CreateOrdinalCondition(
            FilterOperation operation, IList<Expression> filter, Expression memberAccess)
        {
            var isNullable = memberAccess.Type.IsGenericType || memberAccess.Type == typeof(String);
            var memberValue = isNullable ? Expression.Property(memberAccess, "Value") : memberAccess;
            var exp = FindExpressionByName(operation);
            var condition = exp(memberValue, filter[0]);
            for (var i = 1; i < filter.Count; i++)
            {
                condition = Expression.OrElse(condition, exp(memberValue, filter[i]));
            }
            if (isNullable)
            {
                condition = Expression.AndAlso(Expression.NotEqual(memberAccess, Expression.Constant(null)), condition);
            }
            return condition;
        }

        private static Func<Expression, Expression, BinaryExpression> FindExpressionByName(FilterOperation operation)
        {
            Func<Expression, Expression, BinaryExpression> exp;
            switch (operation)
            {
                //equal ==
                case FilterOperation.Equal:
                    exp = Expression.Equal;
                    break;
                //not equal !=
                case FilterOperation.NotEqual:
                    exp = Expression.NotEqual;
                    break;
                case FilterOperation.LessThan:
                    exp = Expression.LessThan;
                    break;
                case FilterOperation.LessThanOrEqual:
                    exp = Expression.LessThanOrEqual;
                    break;
                case FilterOperation.GreaterThan:
                    exp = Expression.GreaterThan;
                    break;
                case FilterOperation.GreaterThanOrEqual:
                    exp = Expression.GreaterThanOrEqual;
                    break;
                default:
                    throw new ArgumentException("column");
            }
            return exp;
        }

        private static List<Expression> TryToSetFilter(object value, Expression memberAccess)
        {
            List<Expression> filter;
            var underlyingType = Nullable.GetUnderlyingType(memberAccess.Type) ?? memberAccess.Type;
            if (underlyingType != typeof(string) && value is String)
            {
                filter =
                    ((String)value).Split('^').Select(
                        it => (Expression)Expression.Constant(Convert.ChangeType(it, underlyingType))).ToList();
            }
            else
            {
                filter = new List<Expression> { Expression.Constant(Convert.ChangeType(value, underlyingType)) };
            }
            return filter;
        }
        #endregion

        #region ConvertToString overloads

        [EdmFunction("SqlServer", "STR")]
        public static String ConvertToString(Object obj)
        {
            return obj == null
                ? null
                : obj.ToString();
        }

        [EdmFunction("SqlServer", "STR")]
        public static String ConvertToString(Double obj)
        {
            return obj.ToString();
        }

        [EdmFunction("SqlServer", "STR")]
        public static String ConvertToString(Int32 obj)
        {
            return obj.ToString();
        }

        [EdmFunction("SqlServer", "STR")]
        public static String ConvertToString(Int16 obj)
        {
            return obj.ToString();
        }

        [EdmFunction("SqlServer", "STR")]
        public static String ConvertToString(Int64 obj)
        {
            return obj.ToString();
        }

        [EdmFunction("SqlServer", "STR")]
        public static String ConvertToString(Boolean obj)
        {
            return obj.ToString();
        }

        [EdmFunction("SqlServer", "STR")]
        public static String ConvertToString(Decimal obj)
        {
            return obj.ToString();
        }

        [EdmFunction("SqlServer", "STR")]
        public static String ConvertToString(Byte obj)
        {
            return obj.ToString();
        }

        [EdmFunction("TMPModel", "FormatDateTime")]
        public static String ConvertToString(DateTime obj)
        {
            return obj.ToString();
        }

        [EdmFunction("SqlServer", "STR")]
        public static String ConvertToString(Guid obj)
        {
            return obj.ToString();
        }


        [EdmFunction("SqlServer", "STR")]
        public static String ConvertToString(Double? obj)
        {
            return obj == null
                ? null
                : obj.ToString();
        }

        [EdmFunction("SqlServer", "STR")]
        public static String ConvertToString(Int16? obj)
        {
            return obj == null
                ? null
                : obj.ToString();
        }

        [EdmFunction("SqlServer", "STR")]
        public static String ConvertToString(Int32? obj)
        {
            return obj == null
                ? null
                : obj.ToString();
        }

        [EdmFunction("SqlServer", "STR")]
        public static String ConvertToString(Int64? obj)
        {
            return obj == null
                ? null
                : obj.ToString();
        }

        [EdmFunction("SqlServer", "STR")]
        public static String ConvertToString(Boolean? obj)
        {
            return obj == null
                ? null
                : obj.ToString();
        }

        [EdmFunction("SqlServer", "STR")]
        public static String ConvertToString(Decimal? obj)
        {
            return obj == null
                ? null
                : obj.ToString();
        }

        [EdmFunction("SqlServer", "STR")]
        public static String ConvertToString(Byte? obj)
        {
            return obj == null
                ? null
                : obj.ToString();
        }

        [EdmFunction("TMPModel", "FormatDateTime")]
        public static String ConvertToString(DateTime? obj)
        {
            return obj == null
                ? null
                : obj.ToString();
        }

        [EdmFunction("SqlServer", "STR")]
        public static String ConvertToString(Guid? obj)
        {
            return obj == null
                ? null
                : obj.ToString();
        }

        [EdmFunction("Edm", "Concat")]
        public static String Concat(String s1, String s2)
        {
            return s1 + s2;
        }

        #endregion

        #region Type system helper methods

        internal static Type GetElementType(Type seqType)
        {
            var ienum = FindIEnumerable(seqType);
            return ienum == null ? seqType : ienum.GetGenericArguments()[0];
        }

        private static Type FindIEnumerable(Type sequenceType)
        {

            if (sequenceType == null || sequenceType == typeof(string))
                return null;

            if (sequenceType.IsArray)
                return typeof(IEnumerable<>).MakeGenericType(sequenceType.GetElementType());

            if (sequenceType.IsGenericType)
            {
                foreach (var arg in sequenceType.GetGenericArguments())
                {
                    var ienum = typeof(IEnumerable<>).MakeGenericType(arg);
                    if (ienum.IsAssignableFrom(sequenceType))
                        return ienum;
                }
            }

            var interfaces = sequenceType.GetInterfaces();

            if (interfaces.Length > 0)
            {
                foreach (var curInterface in interfaces)
                {
                    var ienum = FindIEnumerable(curInterface);
                    if (ienum != null) return ienum;
                }
            }

            if (sequenceType.BaseType != null && sequenceType.BaseType != typeof(object))
                return FindIEnumerable(sequenceType.BaseType);
            return null;
        }

        #endregion
    }
}
