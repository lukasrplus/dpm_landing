require 'test_helper'

class StaticPagesControllerTest < ActionController::TestCase
  test "should get landing" do
    get :landing
    assert_response :success
  end

  test "should get imprint" do
    get :imprint
    assert_response :success
  end

end
