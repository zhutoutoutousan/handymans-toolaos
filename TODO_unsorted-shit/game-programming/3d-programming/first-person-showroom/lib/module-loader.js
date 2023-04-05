THREE.MeshStandardMaterial = function( parameters ) {
    Material.call( this );

    this.defines = { 'STANDARD': '' };

    this.type = 'MeshStandardMaterial';

    this.color = new Color( 0xffffff ); // diffuse
    this.roughness = 1.0;
    this.metalness = 0.0;

    this.map = null;

    this.lightMap = null;
    this.lightMapIntensity = 1.0;

    this.aoMap = null;
    this.aoMapIntensity = 1.0;

    this.emissive = new Color( 0x000000 );
    this.emissiveIntensity = 1.0;
    this.emissiveMap = null;

    this.bumpMap = null;
    this.bumpScale = 1;

    this.normalMap = null;
    this.normalMapType = TangentSpaceNormalMap;
    this.normalScale = new Vector2( 1, 1 );

    this.displacementMap = null;
    this.displacementScale = 1;
    this.displacementBias = 0;

    this.roughnessMap = null;

    this.metalnessMap = null;

    this.alphaMap = null;

    this.envMap = null;
    this.envMapIntensity = 1.0;

    this.refractionRatio = 0.98;

    this.wireframe = false;
    this.wireframeLinewidth = 1;
    this.wireframeLinecap = 'round';
    this.wireframeLinejoin = 'round';

    this.skinning = false;
    this.morphTargets = false;
    this.morphNormals = false;

    this.vertexTangents = false;

    this.setValues( parameters ); 
}

THREE.MeshStandardMaterial.prototype = Object.create( THREE.Material.prototype );
THREE.MeshStandardMaterial.prototype.constructor = THREE.MeshStandardMaterial;

THREE.MeshStandardMaterial.prototype.isMeshStandardMaterial = true;

THREE.MeshStandardMaterial.prototype.copy = function ( source ) {

    THREE.Material.prototype.copy.call( this, source );

    this.defines = { 'STANDARD': '' };

    this.color.copy( source.color );
    this.roughness = source.roughness;
    this.metalness = source.metalness;

    this.map = source.map;

    this.lightMap = source.lightMap;
    this.lightMapIntensity = source.lightMapIntensity;

    this.aoMap = source.aoMap;
    this.aoMapIntensity = source.aoMapIntensity;

    this.emissive.copy( source.emissive );
    this.emissiveMap = source.emissiveMap;
    this.emissiveIntensity = source.emissiveIntensity;

    this.bumpMap = source.bumpMap;
    this.bumpScale = source.bumpScale;

    this.normalMap = source.normalMap;
    this.normalMapType = source.normalMapType;
    this.normalScale.copy( source.normalScale );

    this.displacementMap = source.displacementMap;
    this.displacementScale = source.displacementScale;
    this.displacementBias = source.displacementBias;

    this.roughnessMap = source.roughnessMap;

    this.metalnessMap = source.metalnessMap;

    this.alphaMap = source.alphaMap;

    this.envMap = source.envMap;
    this.envMapIntensity = source.envMapIntensity;

    this.refractionRatio = source.refractionRatio;

    this.wireframe = source.wireframe;
    this.wireframeLinewidth = source.wireframeLinewidth;
    this.wireframeLinecap = source.wireframeLinecap;
    this.wireframeLinejoin = source.wireframeLinejoin;

    this.skinning = source.skinning;
    this.morphTargets = source.morphTargets;
    this.morphNormals = source.morphNormals;

    this.vertexTangents = source.vertexTangents;

    return this;

};


THREE.Interpolant = function( parameterPositions, sampleValues, sampleSize, resultBuffer ) {

    this.parameterPositions = parameterPositions;
	this._cachedIndex = 0;

	this.resultBuffer = resultBuffer !== undefined ?
		resultBuffer : new sampleValues.constructor( sampleSize );
	this.sampleValues = sampleValues;
	this.valueSize = sampleSize;

}

Object.assign( THREE.Interpolant.prototype, {

	evaluate: function ( t ) {

		const pp = this.parameterPositions;
		let i1 = this._cachedIndex,
			t1 = pp[ i1 ],
			t0 = pp[ i1 - 1 ];

		validate_interval: {

			seek: {

				let right;

				linear_scan: {

					//- See http://jsperf.com/comparison-to-undefined/3
					//- slower code:
					//-
					//- 				if ( t >= t1 || t1 === undefined ) {
					forward_scan: if ( ! ( t < t1 ) ) {

						for ( let giveUpAt = i1 + 2; ; ) {

							if ( t1 === undefined ) {

								if ( t < t0 ) break forward_scan;

								// after end

								i1 = pp.length;
								this._cachedIndex = i1;
								return this.afterEnd_( i1 - 1, t, t0 );

							}

							if ( i1 === giveUpAt ) break; // this loop

							t0 = t1;
							t1 = pp[ ++ i1 ];

							if ( t < t1 ) {

								// we have arrived at the sought interval
								break seek;

							}

						}

						// prepare binary search on the right side of the index
						right = pp.length;
						break linear_scan;

					}

					//- slower code:
					//-					if ( t < t0 || t0 === undefined ) {
					if ( ! ( t >= t0 ) ) {

						// looping?

						const t1global = pp[ 1 ];

						if ( t < t1global ) {

							i1 = 2; // + 1, using the scan for the details
							t0 = t1global;

						}

						// linear reverse scan

						for ( let giveUpAt = i1 - 2; ; ) {

							if ( t0 === undefined ) {

								// before start

								this._cachedIndex = 0;
								return this.beforeStart_( 0, t, t1 );

							}

							if ( i1 === giveUpAt ) break; // this loop

							t1 = t0;
							t0 = pp[ -- i1 - 1 ];

							if ( t >= t0 ) {

								// we have arrived at the sought interval
								break seek;

							}

						}

						// prepare binary search on the left side of the index
						right = i1;
						i1 = 0;
						break linear_scan;

					}

					// the interval is valid

					break validate_interval;

				} // linear scan

				// binary search

				while ( i1 < right ) {

					const mid = ( i1 + right ) >>> 1;

					if ( t < pp[ mid ] ) {

						right = mid;

					} else {

						i1 = mid + 1;

					}

				}

				t1 = pp[ i1 ];
				t0 = pp[ i1 - 1 ];

				// check boundary cases, again

				if ( t0 === undefined ) {

					this._cachedIndex = 0;
					return this.beforeStart_( 0, t, t1 );

				}

				if ( t1 === undefined ) {

					i1 = pp.length;
					this._cachedIndex = i1;
					return this.afterEnd_( i1 - 1, t0, t );

				}

			} // seek

			this._cachedIndex = i1;

			this.intervalChanged_( i1, t0, t1 );

		} // validate_interval

		return this.interpolate_( i1, t0, t, t1 );

	},

	settings: null, // optional, subclass-specific settings structure
	// Note: The indirection allows central control of many interpolants.

	// --- Protected interface

	DefaultSettings_: {},

	getSettings_: function () {

		return this.settings || this.DefaultSettings_;

	},

	copySampleValue_: function ( index ) {

		// copies a sample value to the result buffer

		const result = this.resultBuffer,
			values = this.sampleValues,
			stride = this.valueSize,
			offset = index * stride;

		for ( let i = 0; i !== stride; ++ i ) {

			result[ i ] = values[ offset + i ];

		}

		return result;

	},

	// Template methods for derived classes:

	interpolate_: function ( /* i1, t0, t, t1 */ ) {

		throw new Error( 'call to abstract method' );
		// implementations shall return this.resultBuffer

	},

	intervalChanged_: function ( /* i1, t0, t1 */ ) {

		// empty

	}

} );

// DECLARE ALIAS AFTER assign prototype
Object.assign( THREE.Interpolant.prototype, {

	//( 0, t, t0 ), returns this.resultBuffer
	beforeStart_: THREE.Interpolant.prototype.copySampleValue_,

	//( N-1, tN-1, t ), returns this.resultBuffer
	afterEnd_: THREE.Interpolant.prototype.copySampleValue_,

} );
