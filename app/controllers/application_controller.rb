#coding:utf-8
class ApplicationController < ActionController::Base
  before_filter :get_user
  def get_user
    if session[:name].nil?
      redirect_to "/home"
    end
  end

end
