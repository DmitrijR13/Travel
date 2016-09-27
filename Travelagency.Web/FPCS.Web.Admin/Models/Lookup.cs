using System;

namespace FPCS.Web.Admin.Models
{
    public class Lookup<T> 
    {
        public T Value { get; set; }

        public String Text { get; set; }

        public String Additional { get; set; }
    }

    public class Lookup<T, T2>
    {
        public T Value { get; set; }

        public T2 Text { get; set; }

        public String Additional { get; set; }
    }

    public class Lookup<T, T2, T3>
    {
        public T Value { get; set; }

        public T2 Text { get; set; }

        public T3 Additional { get; set; }
    }

    public class Lookup<T, T2, T3, T4>
    {
        public T Value { get; set; }

        public T2 Text { get; set; }

        public T3 Additional { get; set; }

        public T4 Additional2 { get; set; }
    }
}