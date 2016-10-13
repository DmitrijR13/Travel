using System.ComponentModel;

namespace FPCS.Data.Enums
{
    public enum TypeFiz
    {
        [DescriptionAttribute("Частное лицо")]
        Private = 1,
        [DescriptionAttribute("Корпоративный клиент")]
        Corporative = 2,
    }
}
