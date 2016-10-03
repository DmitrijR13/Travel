using System.Web;
using System.Web.Optimization;

namespace FPCS.Web.Admin
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            // Script bundles
           
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-2.0.3.min.js"));
            
            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.unobtrusive*",
                        "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                        "~/Scripts/bootstrap.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquery-migrate").Include(
                        "~/Scripts/jquery-migrate-1.2.1.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap-tag").Include(
                        "~/Scripts/bootstrap-tag.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap-wysiwyg").Include(
                        "~/Scripts/bootstrap-wysiwyg.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquery-hotkeys").Include(
                        "~/Scripts/jquery.hotkeys.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquery-ui").Include(
                        "~/Scripts/jquery-ui-1.10.3.min.js",
                        "~/Scripts/jquery.ui.touch-punch.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquery-slimscroll").Include(
                        "~/Scripts/jquery.slimscroll.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap-datetimepicker").Include(
                        //"~/Scripts/date-time/bootstrap-datepicker.min.js",
                        "~/Scripts/date-time/bootstrap-datepicker.js",
                        "~/Scripts/date-time/bootstrap-timepicker.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquery-autosize").Include(
                        "~/Scripts/jquery.autosize-min.js"));

            bundles.Add(new ScriptBundle("~/bundles/chosen-jquery").Include(
                        "~/Scripts/chosen.jquery.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/maskedinput").Include(
                        "~/Scripts/date-time/maskedinput.js"));

            bundles.Add(new ScriptBundle("~/bundles/select2-jquery").Include(
                        "~/Scripts/select2.full.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/fuelux-spinner").Include(
                        "~/Scripts/fuelux.spinner.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquery-scrolltable").Include(
                        "~/Scripts/jquery.scrolltable.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquery-alerts").Include(
                        "~/Scripts/jquery.alerts.js"));

            bundles.Add(new ScriptBundle("~/bundles/ace").Include(
                        "~/Scripts/ace-elements.min.js",
                        "~/Scripts/ace.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/editable").Include(
                        "~/Scripts/bootstrap-editable.min.js",
                        "~/Scripts/editableQtr.js",
                        "~/Scripts/editableSem.js",
                        "~/Scripts/editableAmp.js"));
            
            bundles.Add(new ScriptBundle("~/bundles/fpcs").Include(
                        "~/Scripts/fpcs.base.js",
                        "~/Scripts/fpcs.topNav.js",
                        "~/Scripts/fpcs.jqGrid.js",
                        "~/Scripts/fpcs.family.js",
                        "~/Scripts/fpcs.monthlyContactLog.js",
                        "~/Scripts/fpcs.guardian.js",
                        "~/Scripts/fpcs.student.js",
                        "~/Scripts/fizPerson.js",
                        "~/Scripts/fpcs.teacher.js",
                        "~/Scripts/fpcs.user.js",
                        "~/Scripts/fpcs.schoolYear.js",
                        "~/Scripts/fpcs.asdCourse.js",
                        "~/Scripts/fpcs.fpcsCourse.js",
                        "~/Scripts/fpcs.fpcsGoodService.js",
                        "~/Scripts/fpcs.studentPacket.js",
                        "~/Scripts/fpcs.studentPacket2.js",
                        "~/Scripts/fpcs.goodService.js",
                        "~/Scripts/fpcs.dataStudentPacket.js",
                        "~/Scripts/fpcs.vendor.js",
                        "~/Scripts/fpcs.ILP.js",
                        "~/Scripts/fpcs.ILPBank.js",
                        "~/Scripts/fpcs.enrollmentList.js",
                        "~/Scripts/fpcs.studentPacketCourseAlert.js",
                        "~/Scripts/fpcs.signedCourse.js",
				"~/Scripts/fpcs.signedPacket.js",
                        "~/Scripts/fpcs.instructor.js",
                        "~/Scripts/fpcs.grade.js",
                        "~/Scripts/fpcs.transfer.js",
                        "~/Scripts/fpcs.subject.js",
                        "~/Scripts/fpcs.import.js",
                        "~/Scripts/fpcs.dashboard.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqGrid").Include(
                        "~/Scripts/jquery.jqGrid.min.js",
                        "~/Scripts/grid.locale-en.js"));

            // Styles bundles

            bundles.Add(new StyleBundle("~/Content/css/bootstrap").Include(
                        "~/Content/css/bootstrap.min.css",
                        "~/Content/css/bootstrap-responsive.min.css",
                        "~/Content/css/font-awesome.min.css"));

            bundles.Add(new StyleBundle("~/Content/css/plugin").Include(
                        "~/Content/css/jquery-ui-1.10.3.full.min.css",
                        "~/Content/css/datepicker.css",
                        "~/Content/css/bootstrap-timepicker.css",
                        "~/Content/css/chosen.css",
                        "~/Content/css/select2.min.css",
                        "~/Content/css/jquery.alerts.css",
                        "~/Content/css/bootstrap-editable.css"));

            bundles.Add(new StyleBundle("~/Content/css/ace").Include(
                        "~/Content/css/ace-fonts.css",
                        "~/Content/css/ace.min.css",
                        "~/Content/css/ace-responsive.min.css",
                        "~/Content/css/ace-skins.min.css"));

            bundles.Add(new StyleBundle("~/Content/css/site").Include(
                        "~/Content/css/site.css",
                        "~/Content/css/printStyle.css"));

            bundles.Add(new StyleBundle("~/Content/css/jqGrid").Include(
                        "~/Content/css/ui.jqgrid.css"));

            //BundleTable.EnableOptimizations = false;
        }
    }
}