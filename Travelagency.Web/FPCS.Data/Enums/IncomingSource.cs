using System.ComponentModel;

namespace FPCS.Data.Enums
{
    public enum IncomingSource
    {
        [DescriptionAttribute("Телефон")]
        Phone = 1,
        [DescriptionAttribute("Email")]
        Email = 2,
        [DescriptionAttribute("Визит в офис")]
        VisitTheOffice = 3,
        [DescriptionAttribute("Другое")]
        Other = 4
    }
}
