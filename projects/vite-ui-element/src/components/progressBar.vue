<template>
    <div class="container">
  <div class="row">
    <div class="col-xs-12 col-md-6 col-md-offset-3">
      <header class="text-center">
        <h2 v-if="completed === 100">Completed 
        <span class="fa fa-smile-o"></span>
        </h2>
        <h2 v-else>Not Completed
          <span class="fa fa-frown-o"></span>
        </h2>
        <hr />
        <div class="progress">
          <div class="progress-bar progress-bar-striped active" 
               role="progressbar" aria-valuenow="{{ completed }}" 
               aria-valuemin="0" aria-valuemax="100" 
               style="width: {{ completed }}%;"
               :class="{'progress-bar-success' : completed === 100}"
               >
            {{ completed }}%
          </div>
        </div>
      </header>
      <input type="text" @focus="checkCompleted" value="Fill in the rest..." class="form-control"/>
      <input type="text" @focus="checkCompleted" class="form-control"/>
      <input type="text" @focus="checkCompleted" class="form-control"/>
      <button vi class="btn btn-primary float-right" @focus="checkCompleted" :disabled="completed != 100">Proceed</button>
    </div>
  </div>
</div>
</template>