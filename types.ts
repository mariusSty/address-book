export enum Actions {
  "Add" = "Add",
  "Delete" = "Delete",
  "Update" = "Update",
}

export const toastMessage = new Map([
  [Actions.Add, "Nouvelle adresse ajoutée"],
  [Actions.Delete, "L'adresse a été supprimée"],
  [Actions.Update, "Modification éffectuée"],
]);
