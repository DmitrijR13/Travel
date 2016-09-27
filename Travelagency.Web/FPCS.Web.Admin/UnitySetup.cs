using Microsoft.Practices.Unity;

using FPCS.Core.Unity;

namespace FPCS.Web.Admin
{
    public class UnitySetup : IUnitySetup
    {
        public IUnityContainer RegisterTypes(IUnityContainer container)
        {


            return container;
        }
    }
}
