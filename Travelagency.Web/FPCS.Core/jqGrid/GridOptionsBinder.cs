using System;
using System.Web.Mvc;

namespace FPCS.Core.jqGrid
{
    public class GridOptionsBinder : IModelBinder
    {
        public object BindModel(ControllerContext controllerContext, ModelBindingContext bindingContext)
        {
            try
            {
                var request = controllerContext.HttpContext.Request;
                var options = new GridOptions
                {
                    IsSearch = Boolean.Parse(request["_search"] ?? "false"),
                    PageIndex = Int32.Parse(request["page"] ?? "1"),
                    PageSize = Int32.Parse(request["rows"] ?? "20"),
                    SortColumn = request["sidx"] ?? "",
                    IsSortASC = String.IsNullOrEmpty(request["sord"]) || request["sord"] == "asc" ? true : false,
                    ND = Int64.Parse(request["nd"] ?? "-1")
                };

                return options;
            }
            catch
            {
                return null;
            }
        }
    }
}