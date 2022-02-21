<!--搜索与重置-->
<template>
  <span>
    <slot name="search" />
    <el-button v-if="!hideSearch" class="filter-item" size="mini" type="success" icon="el-icon-search" @click="crud.toQuery">搜索</el-button>
    <el-button class="filter-item" size="mini" type="warning" icon="el-icon-refresh-left" @click="crud.resetQuery()">重置</el-button>
  </span>
</template>
<script>
export default {
  props: {
    crud: {
      type: Object,
      required: true
    },
    itemClass: {
      type: String,
      required: false,
      default: ''
    },
    hideSearch: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>
