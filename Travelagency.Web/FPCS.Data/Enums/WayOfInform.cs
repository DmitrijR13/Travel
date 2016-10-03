using System.ComponentModel;

namespace FPCS.Data.Enums
{
    public enum WayOfInform
    {
        [DescriptionAttribute("Телефон")]
        Phone = 1,
        [DescriptionAttribute("Email")]
        Email = 2,
        [DescriptionAttribute("Любым удобным способом")]
        Other = 3
    }
}
