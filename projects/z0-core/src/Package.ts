/**
 * Represents a package
 */
export type Package = {
    /**
     * The package name
     */
    readonly name : string

    /**
     * The package version
     */
    readonly version: string   
}

/**
 * Represents a package with a known location
 */
export type LocatedPackage = 
    Package & {readonly location:string}


/**
 * Represents a dependency on a package
 */
export type PackageDependency = {

    /**
     * The package name
     */
    readonly name: string
    
    /**
     * The minimum package version
     */
    readonly minver?: string

    /**
     * The maximum package version
     */
    readonly maxver?:string

}

/**
 * Represents a collection of packages
 */
export type PackageSet = {
    readonly Packages : Package[]        
}

/**
 * Represents a collection of located packages
 */
export type LocatedPackageSet = {
    readonly Packages : LocatedPackage[]        
}
