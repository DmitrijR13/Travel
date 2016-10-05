namespace FPCS.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _04_10_2016_00 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.FisicalPersons", "DateOfBirth", c => c.DateTimeOffset(precision: 7));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.FisicalPersons", "DateOfBirth", c => c.DateTimeOffset(nullable: false, precision: 7));
        }
    }
}
