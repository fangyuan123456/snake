interface panelStruct{
    url:string,
    bundleName?:string
}
export let panelCfg:{[key: string]: panelStruct} = {
    testPanel:{
        url:"prefabs/panel/TestPanel"
    },
}