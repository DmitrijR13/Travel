using System;

namespace FPCS.Data.Exceptions
{
    public class DuplicateEntityException : Exception
    {
        public DuplicateEntityException()
            : base()
        {
        }

        public DuplicateEntityException(String message)
            : base(message)
        {
        }

        public DuplicateEntityException(String format, params Object[] args)
            : base(String.Format(format, args))
        {
        }
    }
}
