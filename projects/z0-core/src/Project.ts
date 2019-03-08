import { FolderPath, RelativePath, FileName } from "./FileModel";

/**
 * Defines the structural features of the "project" concept
 */
export interface Project
{
    /**
     * The root of the project in the file system
     */
    readonly root: FolderPath
    /**
     * The name of the project's configuration file which, by convention, 
     * lives immediately under the root folder with the name ".z0prj"
     */
    readonly config: FileName
    
    /**
     * The artifacts contained in the project
     * @description Every file in the peer directory and (recursive) subdirectories (which are not themselves project roots)
     * is implicitly a project item unless it is precluded by .gitignore configuration
     */
    readonly items: RelativePath[]
    
    /**
     * The top-level subprojects with is determined by the presence
     * of a ".z0prj" file
     */
    readonly subprojects: Project[]
}