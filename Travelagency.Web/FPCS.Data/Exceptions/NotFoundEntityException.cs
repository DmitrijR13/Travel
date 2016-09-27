using System;

namespace FPCS.Data.Exceptions
{
    public class NotFoundEntityException : Exception
    {
        public NotFoundEntityException()
            : base()
        {
        }

        public NotFoundEntityException(String message)
            : base(message)
        {
        }

        public NotFoundEntityException(String format, params Object[] args)
            : base(String.Format(format, args))
        {
        }
    }
}
