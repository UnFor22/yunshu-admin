<template>
    <label class="checkbox-com">
        <input type="checkbox" class="checkbox-com-input" v-model="currentValue" value="998">
        <span class="box-wrap"></span>
    </label>
</template>

<script>
    export default {
        props: {
            value: {
                type: [String, Number]
            }
        },
        data () {
            return {
                currentValue: this.value
            }
        },
        watch: {
            currentValue(newValue) {
                this.$emit('input',newValue)
                this.$emit('change',newValue)
            },
            value () {
                this.currentValue = this.value
            }
        }
    }  
</script>

<style scoped>
    .checkbox-com{
        display: inline-block;
        width: 50px;
        height: 50px;
        border: 1px solid #ccc;
        border-radius:3px;
        cursor: pointer;
    }
    .checkbox-com-input {
        display: none;
    }
    .box-wrap {
        transform: scale(0);
        position: relative;
        display: inline-block;
        width: 100%;
        height: 100%;
    }
    .checkbox-com-input:checked + .box-wrap {
        transition: transform .1s ease;
        transform: scale(1);     
        background: #409eff;
    }
    .checkbox-com-input:checked + .box-wrap::after {
        content: '';
        position: absolute;
        left: 50%;
        top: 34%;
        display: block;
        width: 0;
        height: 0;  
        border-top: 14px solid transparent;
        border-right: 30px solid transparent;
        border-left: 4px solid #fff;
        border-bottom: 4px solid #fff;
        transform: translate(-50%,-50%) rotate(-45deg);
    }
</style>