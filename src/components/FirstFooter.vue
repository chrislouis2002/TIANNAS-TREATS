<template>
<div class="contfft">
   <div class="logobx"><img src="logoo.png" id="logo"/></div>
</div>
</template>

<script>
import { defineComponent } from "vue"

export default defineComponent({

    name:"FirstFooter",

    data:()=>({

    }),
    methods:{

    }
})
</script>

<style scoped>
.contfft{
   /* background-image:url('http://localhost:9000/6.png');*/
    background-image:url('../bg4.jpg');
    background-repeat:no-repeat;
    display:flex;
    justify-content:center;
    align-items:center;
}
@media screen and (min-width:640px){
    .contfft{
        width:100%;
        height:250px;
        background-size:100% 350px;
    }
}

@media screen and (max-width:620px){
    .contfft{
        width:100%;
        height:200px;
        background-size:100% 250px;
    }
}
</style>
