namespace FPCS.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _11_10_2016_00 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Workers",
                c => new
                    {
                        WorkerId = c.Long(nullable: false, identity: true),
                        FIO = c.String(maxLength: 100),
                        CellPhone = c.String(maxLength: 20),
                        Phone = c.String(maxLength: 20),
                        Job = c.String(maxLength: 100),
                        Email = c.String(maxLength: 50),
                        DateStart = c.DateTimeOffset(nullable: false, precision: 7),
                        DateFinish = c.DateTimeOffset(precision: 7),
                        IsDeleted = c.Boolean(nullable: false),
                        CreatedDate = c.DateTimeOffset(nullable: false, precision: 7),
                        UpdatedDate = c.DateTimeOffset(nullable: false, precision: 7),
                    })
                .PrimaryKey(t => t.WorkerId);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Workers");
        }
    }
}
