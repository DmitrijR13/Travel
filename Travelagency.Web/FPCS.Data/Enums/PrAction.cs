using System.ComponentModel;

namespace FPCS.Data.Enums
{
    public enum PrAction
    {
        [DescriptionAttribute("Раздача рекламных материалов")]
        PromotionMaterials = 1,
        [DescriptionAttribute("СМИ")]
        MassMedia = 2,
        [DescriptionAttribute("Интернет")]
        Internet = 3,
        [DescriptionAttribute("Иное")]
        Other = 4
    }
}
