using Microsoft.Practices.Unity;

namespace FPCS.Core.Unity
{
    public interface IUnitySetup
    {
        IUnityContainer RegisterTypes(IUnityContainer container);
    }
}
