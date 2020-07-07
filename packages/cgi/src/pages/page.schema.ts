import * as mongoose from 'mongoose';

const pluginSchemaDefinition = {
    key: Number,
    id: Number,
    data: Object,
};

const actionSchemaDefinition = {
    ...pluginSchemaDefinition,
    trigger: String,
};

const componentSchemaDefinition = {
    key: Number,
    id: Number,
    data: Object,
    style: Object,
    actions: [actionSchemaDefinition],
};

const dataSchemaDefinition = {
    title: String,
    description: String,
    startDate: Date,
    endDate: Date,
    globalData: Object,
    components: [componentSchemaDefinition],
    plugins: [pluginSchemaDefinition],
};

export const PageSchema = new mongoose.Schema({
    key: Number,
    createDate: Date,
    createUser: String,
    data: dataSchemaDefinition,
    historyData: [dataSchemaDefinition],
});
