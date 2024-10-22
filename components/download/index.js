import fs from 'fs'
import { DOWNLOAD_IMAGE_PATH } from '../../const'

export const downloadImagePath = DOWNLOAD_IMAGE_PATH

const saveImageIfNeeded = async (blocksWithChildren, path) => {
  const tmpPath = `${downloadImagePath}/${path}`
  const tmpBlock = blocksWithChildren
  
  if (!fs.existsSync(tmpPath)) {
    fs.mkdirSync(tmpPath)
  }

  tmpBlock.forEach(async (block) => {
    const image = block.image
    await save(tmpPath, image)
  })
}

const save = async (tmpPath, image) => {
  if(!image){
      console.log("not found image")
      return
  }
  
  await checkBlock(tmpPath, image)
}

const checkBlock = async (path, image) => {

  if (image.type == 'files' && image.files[0]) {

    const tmpName = image.files[0].name
    const name = tmpName.replace(/ /g, '_')

    const url = image.files[0].file.url
    const blob = await getTemporaryImage(url)

    if (!blob) {
      console.log("not found blob")
      return ''
    }

    const extension = blob.type.replace('image/', '')

    if (!isImageExist(path, name)) {
      const binary = (await blob.arrayBuffer())
      const buffer = Buffer.from(binary)
      await saveImage(buffer, path, name)
    } else {
      console.log("already exist image.")
    }
  }
}

/// 一時ファイルの画像をバイナリとして取得する。ここで画像のフォーマットがわかる
const getTemporaryImage = async (url) => {
  try {
    const blob = await fetch(url).then((r) => r.blob())
    return blob
  } catch (error) {
    console.log(error)
    return null
  }
}

const isImageExist = (path, keyName) => {
  return fs.existsSync(path + '/' + keyName)
}

const saveImage = (imageBinary, path, keyName) => {

  const maxRetries = 3
  const saveWithRetry = (attempt) => {
    
    fs.writeFile(path + '/' + keyName, imageBinary, (error) => {
      if (error) {
        if (attempt < maxRetries) {
          console.log(`Error during saveImage, attempt ${attempt + 1} of ${maxRetries}. Retrying in ${retryDelay}ms...`);
          setTimeout(() => save(attempt + 1), retryDelay);
        } else {
          console.log('Max retries reached. Error during saveImage:');
          console.log(error);
          throw error;
        }
      } else {
        console.log('Image saved successfully.');
      }
    });
  };

  saveWithRetry(0)
}

export default saveImageIfNeeded