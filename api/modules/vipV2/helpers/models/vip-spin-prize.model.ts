import mongoose, { Document, Schema } from 'mongoose';

import { toJSON } from '@utils/model-plugins';

export interface IVipSpinPrize extends Document {
    _id: Schema.Types.ObjectId;
    prizes: { id: string; amount: number; probability: number }[];
    tiersId: Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const ModelSchema = new mongoose.Schema<IVipSpinPrize>(
    {
        prizes: {
            type: [{ id: String, amount: Number, probability: Number }],
            required: true,
            validate: {
                validator: function (value: any[]) {
                    return value.length >= 16 && value.length <= 16;
                },
                message: 'prizes array must contain 16 items'
            }
        },
        tiersId: {
            type: Schema.Types.ObjectId,
            required: true
        }
    },
    { timestamps: true }
);

// add plugin that converts mongoose to json
ModelSchema.plugin(toJSON);
ModelSchema.index({ tiersId: 1, createdAt: 1, updatedAt: 1 });

const VipSpinPrizeModel = mongoose.model<IVipSpinPrize>('vip-spin-prize', ModelSchema);

export default VipSpinPrizeModel;
