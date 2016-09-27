using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Microsoft.Practices.Unity;

namespace FPCS.Core.Unity
{
    public class UnityManager
    {
        #region singleton

        public static UnityManager Instance
        {
            get
            {
                if (_instance == null) _instance = new UnityManager();
                return _instance;
            }
        }

        private static UnityManager _instance = null;

        #endregion singleton

        public UnityManager()
        {
            UnityContainer = new UnityContainer();
        }

        public IUnityContainer UnityContainer { get; private set; }

        public T Resolve<T>(params ResolverOverride[] overrides)
        {
            return UnityContainer.Resolve<T>(overrides);
        }

        public T Resolve<T>(string name, params ResolverOverride[] overrides)
        {
            return UnityContainer.Resolve<T>(name, overrides);
        }

        public object Resolve(Type t, params ResolverOverride[] overrides)
        {
            return UnityContainer.Resolve(t, overrides);
        }

        public void RegisterAllUnitySetups()
        {
            var allTypes = new List<Type>();
            var names = Assembly.GetCallingAssembly().GetReferencedAssemblies().ToList();
            names.Add(Assembly.GetCallingAssembly().GetName());
            foreach (var item in names)
            {
                try
                {
                    var assembly = Assembly.Load(item.FullName);
                    var types = assembly.GetTypes();
                    allTypes.AddRange(types);
                }
                catch (Exception)
                { }
            }

            Type baseType = typeof(IUnitySetup);
            var setupTypes = allTypes.Where(baseType.IsAssignableFrom).Where(t => t != baseType);
            foreach (var item in setupTypes)
            {
                var setup = (IUnitySetup)Activator.CreateInstance(item);
                UnityContainer = setup.RegisterTypes(UnityContainer);
            }
        }
    }
}
