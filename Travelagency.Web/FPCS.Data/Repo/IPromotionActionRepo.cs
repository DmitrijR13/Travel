using System;

using FPCS.Data.Entities;
using System.Linq;
using FPCS.Data.Enums;

namespace FPCS.Data.Repo
{
    public interface IPromotionActionRepo : IRepoBase<PromotionAction>
    {
        PromotionAction Add(String name, DateTimeOffset dateStart, DateTimeOffset dateFinish, PrAction prAction);

        PromotionAction Update(Int64 promotionActionId, String name, DateTimeOffset dateStart, DateTimeOffset dateFinish, PrAction prAction);
    }
}