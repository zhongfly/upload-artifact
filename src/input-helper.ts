import * as core from '@actions/core'
import {Inputs, NoFileOptions} from './constants'
import {UploadInputs} from './upload-inputs'

/**
 * Helper to get all the inputs for the action
 */
export function getInputs(): UploadInputs {
  const path = core.getInput(Inputs.Path, {required: true})

  const ifNoFilesFound = core.getInput(Inputs.IfNoFilesFound)
  const noFileBehavior: NoFileOptions = NoFileOptions[ifNoFilesFound]

  if (!noFileBehavior) {
    core.setFailed(
      `Unrecognized ${
        Inputs.IfNoFilesFound
      } input. Provided: ${ifNoFilesFound}. Available options: ${Object.keys(
        NoFileOptions
      )}`
    )
  }

  const ifUploadFailed = core.getInput(Inputs.IfUploadFailed)
  const uploadFailedBehavior: NoFileOptions = NoFileOptions[ifUploadFailed]

  if (!noFileBehavior) {
    core.setFailed(
      `Unrecognized ${
        Inputs.IfUploadFailed
      } input. Provided: ${ifUploadFailed}. Available options: ${Object.keys(
        NoFileOptions
      )}`
    )
  }

  const inputs = {
    searchPath: path,
    ifNoFilesFound: noFileBehavior,
    ifUploadFailed: uploadFailedBehavior
  } as UploadInputs

  const retentionDaysStr = core.getInput(Inputs.RetentionDays)
  if (retentionDaysStr) {
    inputs.retentionDays = parseInt(retentionDaysStr)
    if (isNaN(inputs.retentionDays)) {
      core.setFailed('Invalid retention-days')
    }
  }

  return inputs
}
