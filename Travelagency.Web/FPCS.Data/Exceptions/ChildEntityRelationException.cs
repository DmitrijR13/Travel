using System;

namespace FPCS.Data.Exceptions
{
    public class ChildEntityRelationException : Exception
    {
        public ChildEntityRelationException()
            : base()
        {
        }

        public ChildEntityRelationException(String message)
            : base(message)
        {
        }

        public ChildEntityRelationException(String format, params Object[] args)
            : base(String.Format(format, args))
        {
        }
    }
}