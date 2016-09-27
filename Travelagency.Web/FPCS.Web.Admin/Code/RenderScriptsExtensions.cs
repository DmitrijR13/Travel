using System.Web.WebPages;

namespace System.Web.Mvc.Html
{
    public static class RenderScriptsExtensions
    {
        public static IHtmlString InitRenderScripts(this HtmlHelper htmlHelper)
        {
            htmlHelper.ViewContext.HttpContext.Items["_renderscripts_"] = "true";
            return MvcHtmlString.Empty;
        }

        public static IHtmlString Script(this HtmlHelper htmlHelper, Func<object, HelperResult> template)
        {
            var renderscripts = htmlHelper.ViewContext.HttpContext.Items["_renderscripts_"];
            if (renderscripts != null && renderscripts.ToString() == "true")
            {
                htmlHelper.ViewContext.HttpContext.Items["_script_" + Guid.NewGuid()] = template;
            }
            else
            {
                htmlHelper.ViewContext.Writer.Write(template(null));
            }
            return MvcHtmlString.Empty;
        }

        public static IHtmlString Script(this HtmlHelper htmlHelper, IHtmlString htmlString)
        {
            var renderscripts = htmlHelper.ViewContext.HttpContext.Items["_renderscripts_"];
            if (renderscripts != null && renderscripts.ToString() == "true")
            {
                htmlHelper.ViewContext.HttpContext.Items["_script2_" + Guid.NewGuid()] = htmlString;
                return MvcHtmlString.Empty;
            }
            else
            {
                return htmlString;
            }
        }

        public static IHtmlString RenderScripts(this HtmlHelper htmlHelper)
        {
            foreach (Object key in htmlHelper.ViewContext.HttpContext.Items.Keys)
            {
                var keyStr = key.ToString();
                if (keyStr.StartsWith("_script_"))
                {
                    var template = htmlHelper.ViewContext.HttpContext.Items[key] as Func<object, HelperResult>;
                    if (template != null)
                    {
                        htmlHelper.ViewContext.Writer.Write(template(null));
                    }
                }
                else if (keyStr.StartsWith("_script2_"))
                {
                    var script = htmlHelper.ViewContext.HttpContext.Items[key] as IHtmlString;
                    if (script != null)
                    {
                        htmlHelper.ViewContext.Writer.Write(script);
                    }
                }
            }

            return MvcHtmlString.Empty;
        }
    }
}