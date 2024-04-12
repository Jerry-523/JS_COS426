"use strict";

var Filters = Filters || {};

////////////////////////////////////////////////////////////////////////////////
// General utility functions
////////////////////////////////////////////////////////////////////////////////

// Constrain val to the range [min, max]
function clamp(val, min, max) {
  /* Shorthand for:
   * if (val < min) {
   *   return min;
   * } else if (val > max) {
   *   return max;
   * } else {
   *   return val;
   * }
   */
  return ((val < min) ? min : ((val > max) ? max : val));
}

// extract vertex coordinates from a URL string
function stringToCoords( vertsString ) {
  var centers = [];
  var coordStrings = vertsString.split("x");
  var coordsSoFar = 0;
  for (var i = 0; i < coordStrings.length; i++) {
    var coords = coordStrings[i].split("y");
    var x = parseInt(coords[0]);
    var y = parseInt(coords[1]);
    if (!isNaN(x) && !isNaN(y)) {
      centers.push({x: x, y: y})
    }
  }

  return centers;
}

////////////////////////////////////////////////////////////////////////////////
// Filters
////////////////////////////////////////////////////////////////////////////////

// Fill the entire image with color
Filters.fillFilter = function( image, color ) {
  for (var x = 0; x < image.width; x++) {
    for (var y = 0; y < image.height; y++) {
      image.setPixel(x, y, color);
    }
  }
  return image;
};

// At each center, draw a solid circle with the specified radius and color
Filters.brushFilter = function(image, radius, color, vertsString) {
  var centers = stringToCoords(vertsString);

  for (var i = 0; i < centers.length; i++) {
    var centerX = centers[i].x;
    var centerY = centers[i].y;

    for (var x = centerX - radius; x <= centerX + radius; x++) {
      for (var y = centerY - radius; y <= centerY + radius; y++) {
        if ((x - centerX) * (x - centerX) + (y - centerY) * (y - centerY) <= radius * radius) {
      
          image.setPixel(x, y, color);
        }
      }
    }
  }

  return image;
};

/*
 * At each center, draw a soft circle with the specified radius and color.
 * Pixel opacity should linearly decrease with the radius from alpha_at_center to 0.
 */
Filters.softBrushFilter = function(image, radius, color, alpha_at_center, vertsString) {
  var centers = stringToCoords(vertsString);

  for (var i = 0; i < centers.length; i++) {
    var centerX = centers[i].x;
    var centerY = centers[i].y;

    for (var x = centerX - radius; x <= centerX + radius; x++) {
      for (var y = centerY - radius; y <= centerY + radius; y++) {
        
        if ((x - centerX) * (x - centerX) + (y - centerY) * (y - centerY) <= radius * radius) {
        
          var distance = Math.sqrt((x - centerX) * (x - centerX) + (y - centerY) * (y - centerY));
          var opacity = alpha_at_center * (1 - distance / radius);

          var pixelColor = new Pixel(color.data[0], color.data[1], color.data[2], opacity);
          image.setPixel(x, y, pixelColor);
        }
      }
    }
  }

  return image;
};

Filters.customFilter = function(image, value) {
  if (value === 1) {
    // Percorrendo todos os pixels da imagem
    for (var x = 0; x < image.width; x++) {
      for (var y = 0; y < image.height; y++) {
        // Obtendo o pixel atual
        var pixel = image.getPixel(x, y);

        // Convertendo para escala de cinza (média dos valores RGB)
        var grayValue = (pixel.data[0] + pixel.data[1] + pixel.data[2]) / 3;
        var grayPixel = new Pixel(grayValue, grayValue, grayValue, pixel.a);

        image.setPixel(x, y, grayPixel);
      }
    }
  }

  return image;
};

