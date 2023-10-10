//Declaring modules to access .jpg and .pdf files

declare module "*.jpeg" {
    const path: string;
    export default path;
}

declare module "*.png" {
    const path: string;
    export default path;
}

