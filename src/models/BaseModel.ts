/**
 * The base model interface with shared props for all models in this project
 */
export default interface BaseModel {

  /**
   * The primary id of this model
   */
  ID: string,
}

/**
 * Helper function that can be used for any models extending the BaseModel, which will help us search for a model based on ID
 * @param models
 * @param ID
 */
export function findModelByID<ModelType extends BaseModel> (models: ModelType[], ID: string): ModelType|undefined {
  return models.find(model => model.ID === ID)
}
