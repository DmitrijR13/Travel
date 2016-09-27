using System;

namespace FPCS.Data.Exceptions
{
    public class ParamsEntityException : Exception
    {
        public ParamsEntityException()
            : base()
        {
        }

        public ParamsEntityException(String message)
            : base(message)
        {
        }

        public ParamsEntityException(String format, params Object[] args)
            : base(String.Format(format, args))
        {
        }
    }
}