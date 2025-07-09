<!-- pages/Refund.vue -->
<template>
  <div class="row gy-4">
    <div class="col-lg-8">
      <div class="refund-feedback">
        <h5 class="refund-feedback__title">Refund requests made against items you sold</h5>
        <p class="refund-feedback__desc">There are no open refund requests at the moment.</p>
      </div>
    </div>
    <div class="col-lg-4">
      <div class="profile-sidebar">
        <div class="profile-sidebar__item">
          <h6 class="title font-body">Open Request</h6>
          <div class="select-has-icon">
            <select class="common-input">
              <option value="1">Open Requests</option>
              <option value="2">Closed Requests</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
