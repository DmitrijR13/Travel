using System;
using System.Linq;

using FPCS.Data.Entities;
using FPCS.Data.Exceptions;
using FPCS.Data.Enums;

namespace FPCS.Data.Repo.Impl
{
    internal class PromotionActionRepo : RepoBase<PromotionAction, StudentManagementContext>, IPromotionActionRepo
    {
        public PromotionActionRepo(UnitOfWork<StudentManagementContext> unitOfWork) : base(unitOfWork) { }

        #region override methods

        public override IQueryable<PromotionAction> GetAll()
        {
            return DbSet.Where(x => !x.IsDeleted/* && x.IsShow*/);
        }

        #endregion override methods

        
        public PromotionAction Add(String name, DateTimeOffset dateStart, DateTimeOffset dateFinish, PrAction prAction)
        {
            var promotionAction =
                Add(
                new PromotionAction
                {
                    Name = name,
                    DateFinish = dateFinish,
                    DateStart = dateStart,
                    PrAction = prAction,
                    UpdatedDate = DateTime.Now,
                    CreatedDate = DateTime.Now
                });

            return promotionAction;
        }

        public PromotionAction Update(Int64 promotionActionId, String name, DateTimeOffset dateStart, DateTimeOffset dateFinish, PrAction prAction)
        {
            var promotionAction = this.Get(promotionActionId);
            if (promotionAction == null) throw new NotFoundEntityException("Рекламная акция не найдена");

            promotionAction.Name = name;
            promotionAction.DateStart = dateStart;
            promotionAction.DateFinish = dateFinish;
            promotionAction.PrAction = prAction;
            promotionAction.UpdatedDate = DateTimeOffset.Now;

            return promotionAction;
        }
    }
}
