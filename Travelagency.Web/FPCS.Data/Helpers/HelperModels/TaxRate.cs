using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FPCS.Data.Helpers.HelperModels
{
    /// <summary>
    /// Class Tax Rate
    /// </summary>
    public class TaxRate
    {
        /// <summary>
        /// Default constructor
        /// </summary>
        public TaxRate() {}

        /// <summary>
        /// Constructor with parameters
        /// </summary>
        public TaxRate(Decimal baseHourlyRate, Decimal trs, Decimal pers, Decimal fica, Decimal medicare,
            Decimal healthInsurance, Decimal workmansComp, Decimal lifeInsurance, Decimal unemployment,
            Decimal hourlyRateTaxesBenefits, Decimal perDiemRate)
        {
            BaseHourlyRate = Math.Round(baseHourlyRate, 2);
            TRS = trs;
            PERS = pers;
            FICA = fica;
            Medicare = medicare;
            HealthInsurance = healthInsurance;
            WorkmansComp = workmansComp;
            LifeInsurance = lifeInsurance;
            Unemployment = unemployment;
            HourlyRateTaxesBenefits = Math.Round(hourlyRateTaxesBenefits, 2);
            PerDiemRate = perDiemRate;
        }

        public Decimal BaseHourlyRate { get; set; }
        public Decimal TRS { get; set; }
        public Decimal PERS { get; set; }
	    public Decimal FICA { get; set; }
	    public Decimal Medicare { get; set; }
	    public Decimal HealthInsurance { get; set; }
    	public Decimal WorkmansComp { get; set; }
	    public Decimal LifeInsurance { get; set; }
	    public Decimal Unemployment { get; set; }
	    public Decimal HourlyRateTaxesBenefits { get; set; }
        public Decimal PerDiemRate { get; set; }
    }
}