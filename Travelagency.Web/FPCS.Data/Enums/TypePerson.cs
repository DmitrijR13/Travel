using System.ComponentModel;

namespace FPCS.Data.Enums
{
    public enum TypePerson
    {
        [DescriptionAttribute("Физическое лицо")]
        FizPerson = 1,
        [DescriptionAttribute("Юридическое лицо")]
        JurPerson = 2,
        [DescriptionAttribute("Иные")]
        Other = 3
    }
}
