namespace FPCS.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _12_10_2016_00 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ExpensesTypes",
                c => new
                    {
                        ExpensesTypeId = c.Long(nullable: false, identity: true),
                        ExpensesName = c.String(maxLength: 50),
                        Remark = c.String(maxLength: 1000),
                        IsDeleted = c.Boolean(nullable: false),
                        CreatedDate = c.DateTimeOffset(nullable: false, precision: 7),
                        UpdatedDate = c.DateTimeOffset(nullable: false, precision: 7),
                    })
                .PrimaryKey(t => t.ExpensesTypeId);
            
            CreateTable(
                "dbo.ExcursionTypes",
                c => new
                    {
                        ExcursionTypeId = c.Long(nullable: false, identity: true),
                        PathName = c.String(maxLength: 100),
                        Description = c.String(maxLength: 1000),
                        TimeFrom = c.Int(nullable: false),
                        TimeTo = c.Int(nullable: false),
                        Price = c.Decimal(nullable: false, precision: 18, scale: 2),
                        IsDeleted = c.Boolean(nullable: false),
                        CreatedDate = c.DateTimeOffset(nullable: false, precision: 7),
                        UpdatedDate = c.DateTimeOffset(nullable: false, precision: 7),
                    })
                .PrimaryKey(t => t.ExcursionTypeId);
            
            CreateTable(
                "dbo.PromotionActions",
                c => new
                    {
                        PromotionActionId = c.Long(nullable: false, identity: true),
                        DateStart = c.DateTimeOffset(nullable: false, precision: 7),
                        DateFinish = c.DateTimeOffset(nullable: false, precision: 7),
                        PrAction = c.Int(nullable: false),
                        IsDeleted = c.Boolean(nullable: false),
                        CreatedDate = c.DateTimeOffset(nullable: false, precision: 7),
                        UpdatedDate = c.DateTimeOffset(nullable: false, precision: 7),
                    })
                .PrimaryKey(t => t.PromotionActionId);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.PromotionActions");
            DropTable("dbo.ExcursionTypes");
            DropTable("dbo.ExpensesTypes");
        }
    }
}
