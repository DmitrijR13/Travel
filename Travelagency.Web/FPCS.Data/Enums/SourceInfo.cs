using System.ComponentModel;

namespace FPCS.Data.Enums
{
    public enum SourceInfo
    {
        [DescriptionAttribute("Реклама")]
        Advertisement = 1,
        [DescriptionAttribute("Сайт")]
        Site = 2,
        [DescriptionAttribute("Социальные сети")]
        SocialNetworks = 3,
        [DescriptionAttribute("Другое")]
        Other = 4
    }
}
