using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FPCS.Core.Attributes
{
    public class DescriptionAttribute2 : DescriptionAttribute
    {
        public DescriptionAttribute2()
            : base()
        {
        }

        public DescriptionAttribute2(String description)
            : base(description)
        {
        }

        public DescriptionAttribute2(String description, String description2)
            : base (description)
        {
            DescriptionValue2 = description2;
        }

        public String Description2
        {
            get
            {
                return this.DescriptionValue2;
            }
        }
        
        protected String DescriptionValue2 { get; set; }
    }
}
