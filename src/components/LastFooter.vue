<template>
<div class="contft">
    <div>
        <div class="felem">
            <div class="imgbxf"><img class="imgf" src="whatsapp.svg"/></div>
            <div class="imgbxf"><img class="imgf" src="call.svg"/></div>
            <div class="text-white" style="font-size:20px;">07069637571</div>
        </div>

        <!-- <div class="text-white q-pa-xs" style="font-size:20px;display:inline-flex;justify-content:center;align-items:center;">
        <q-icon name="pin_drop" size="20px"/>
        <span>solution fun city </span>
        </div> -->
    </div>
</div>
</template>

<script>
import { defineComponent } from "vue"

export default defineComponent({

    name:"LastFooter",

    data:()=>({

    }),
    methods:{

    }
})
</script>

<style scoped>
.contft{
    border-top:5px solid rgba(229,115,115,1);
}
.felem{
    display:flex;
    flex-direction:row nowrap;
    justify-content:center;
    align-items:center;
    background:rgba(26, 26, 26, 0.5);
}
.imgbxf{
    width:32px;
    height:32px;
}
.imgf{
   width:100%;
   height:auto;
}
</style>
