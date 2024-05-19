<?php
namespace GutenbergBlocks\Services;

use WP_REST_Request;

\defined( 'ABSPATH' ) || die;

class ValidationService {

    /**
     * Validate if the value is required.
     *
     * @param  mixed           $value   The value of the parameter.
     * @param  WP_REST_Request $request The request object.
     * @param  string          $param   The parameter name.
     * @return bool
     */
    public function validate_required( $value, $request, $param ): bool {
        if ( $request->get_attributes()['args'][$param]['required'] && empty( $value ) ) {
            return false;
        }

        return true;
    }
    /**
     * Validate if the value is numeric and greater than 0.
     *
     * @param  mixed           $value   The value of the parameter.
     * @param  WP_REST_Request $request The request object.
     * @param  string          $param   The parameter name.
     * @return bool
     */
    public function validate_numeric_params( $value, $request, $param ): bool {
        if ( !$this->validate_required( $value, $request, $param ) ) {
            return false;
        }

        return is_numeric( $value ) && intval( $value ) > 0;
    }

    /**
     * Validate if the post type exists.
     *
     * @param  mixed           $value   The value of the parameter.
     * @param  WP_REST_Request $request The request object.
     * @param  string          $param   The parameter name.
     * @return bool
     */
    public function validate_post_type( $value, $request, $param ): bool {
        if ( !$this->validate_required( $value, $request, $param ) ) {
            return false;
        }

        return post_type_exists( $value );
    }
}