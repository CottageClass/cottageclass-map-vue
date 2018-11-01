<template>
	<span class="onb-body-full-height">
	  <div class="onb-top-content-wrapper">
      <div class="onb-top-content-container">
        <h1 class="onb-heading-large">Choose Profile Photos</h1>
        <p class="onb-paragraph-subheading-2">Choose the photos that best represent you, your family, or any activities you’d like to share.</p>
      </div>
    </div>
    <div class="onb-photo-grid-container w-clearfix">
      <div v-for="photo in photos" class="onb-photo-item-container">

<!--add key here 
      	<img :src="require(`@/assets/avatar-placeholder.png`)" />

       	<img :src="require(`@/assets/avatar-placeholder.png`)" />

-->


<!-- photo not selected --> 

     <div v-if="!isSelected(photo.id)" class="onb-photo-item-container">
      <span @click="selectPhoto(photo.id)" class="photo-not-selected w-inline-block">
        <div class="selection-number-not-selected"></div>
      </span>
    </div>

<!-- photo selected --> 
    <div v-else class="onb-photo-item-container">
       <span @click="unSelectPhoto(photo.id)" class="photo-selected w-inline-block">
        <div class="selection-number-selected">
          <div>1</div>
        </div>
      </span>
    </div>
    </div>
  </div>
  </span>
</template>

<script>
// todo:
// add better placeholder photos before deploying
// go looking for a library to do this. We'll have to store the images locally I think because they aren't public? 
// it would be a lot easier to build a version of this with public images i.e. profile images and we wouldn't have to ask for special permission. Lots of people have their kids in their profile images. 
// consider pagination or asynchronicity?
// make this use an img tag instead of CSS background images!!!
// look at some of our parents profile pictures


let testPhotos = [ {id: 3242, url: "https://google.com/"}, {id: 3333, url: "https://google.com/"}, {id: 5555, url: "https://google.com/"}, {id: 4444, url: "https://google.com/"} ]

export default {
	name: 'Photos',
	data () {
		return {
		  photos: testPhotos,
		  selectedPhotosById: []
		}
	},
	methods: {
		isSelected: function (photoId) {
			return selectedPhotosById.includes(photoId)
		},
		selectPhoto: function (photoId) {
			this.selectedPhotosById.push(photoId)
		},
		unSelectPhoto: function (photoId) {
			this.selectedPhotosById = this.selectedPhotosById.filter(id => id != photoId) 
		},
		photoNumber: function (photoId) {
			// do something simpler than recursion here! 
			let whichNumber = function (n, first, rest) {
				if (first == photoId) {
					return n
				} else if (rest == []) {
					return false
				} else {
					return whichNumber(n + 1, rest[0], rest.splice(1))
				}
			};
			return whichNumber(0, this.selectedPhotosById[0], this.selectedPhotosById.splice(1))
	},
	watch: {
		selectedPhotos: function () {
			$this.emit('input', selectedPhotsById)
		}
	}
}
};

</script>