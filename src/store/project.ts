import { Image } from './common'
export interface Project {
  name: string,
  desc_en?: string,
  desc_cn?: string,
  type: string,
  start_time: string,
  end_time: string,
  content: string,
  images: [Image]
}

export default class ProjectManager {

}