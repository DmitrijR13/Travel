using System;

namespace FPCS.Data.Exceptions
{
    public class InvalidRangeException : Exception
    {
        public InvalidRangeException()
            : base()
        {
        }

        public InvalidRangeException(String message)
            : base(message)
        {
        }

        public InvalidRangeException(String format, params Object[] args)
            : base(String.Format(format, args))
        {
        }
    }
}
