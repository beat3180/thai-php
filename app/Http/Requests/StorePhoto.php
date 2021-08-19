<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePhoto extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    //認証関係の記述。とりあえずtrue
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    //必須入力。ファイル制限。ファイルタイプ制限
    public function rules()
    {
        return [
           'photo' => 'required|file|mimes:jpg,jpeg,png,gif'
        ];
    }
}
