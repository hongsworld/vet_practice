#coding:utf-8
class HomeController < ApplicationController
  skip_before_filter :get_user , :except => [:timeschedule]
  def index
    render :layout => false
  end

  def login_process
    name = params[:name]
    password = params[:password]
    if User.where(:name => name).last.password == password
      session[:name] = name
      redirect_to "/home/timeschedule"
      #:controller => "home", :action => "timeschedule"
    else
      render :text => "이름과 비밀번호가 틀렸거나 본3이 아닙니다!"
    end
  end

  def timeschedule
    Userweek.where(:major_id => nil).each do |uselessuw|
      uselessuw.destroy
    end
    @restriction_hash = Hash.new
    temp_array = [5,5,4,5,6,6,6,5,6,5,10,3,100,100,100,100,100,100,100,100,100,100,100,100,100,100]
    1.upto(25) do |n|
      @restriction_hash["major#{n}"] = temp_array[n-1]
    end
    @user = User.where(:name=> session[:name]).last
    @users = User.all
  end

  def timeschedule_regi
    user_id = User.where(:name => params[:name]).last.id


    if Userweek.where(:user_id => user_id).where(:week_id => params[:week_id]).empty?
      uw = Userweek.new
      uw.user_id = user_id
      uw.week_id = params[:week_id]
      uw.major_id = params[:major_id]
      uw.type_id = 0
      if params[:is_haemaru] == "true"
        uw.is_haemaru = true
      else
        uw.is_haemaru = false
      end
      uw.save
    else
      uw = Userweek.where(:user_id =>user_id).where(:week_id => params[:week_id]).last
      uw.user_id = user_id
      uw.week_id = params[:week_id]
      uw.major_id = params[:major_id]
      uw.type_id = 0
      if params[:is_haemaru] == "true"
        uw.is_haemaru = true
      else
        uw.is_haemaru = false
      end
      uw.save
    end

    classmate_list1 = Array.new



    if params[:is_haemaru] == "false"
      common_week = Userweek.where(:week_id => params[:week_id]).where(:major_id => params[:major_id]).all
      common_week.each do |x|
        classmate_list1 << x.user.name
      end
    else
      common_week = Userweek.where(:week_id => params[:week_id]).where(:is_haemaru => true).all
      common_week.each do |x|
        classmate_list1 << x.user.name
      end
    end
    data = {:classmate_list => classmate_list1}
    logger.info(data)
    render :json => data.to_json

  end

  def timeschedule_regi_double
    #이전에 그 주차에 있는거 중복되면 갱신하는걸로하자
    user_id = User.where(:name => params[:name]).last.id
    if Userweek.where(:user_id => user_id).where(:week_id => params[:week_id]).empty?
      uw = Userweek.new
      uw.user_id = user_id
      uw.week_id = params[:week_id]
      uw.major_id = params[:major_id]
      uw.type_id = 1
      if params[:is_haemaru] == "true"
        uw.is_haemaru = true
      else
        uw.is_haemaru = false
      end
      uw.save
    else
      uw = Userweek.where(:user_id =>user_id).where(:week_id => params[:week_id]).last
      uw.user_id = user_id
      uw.week_id = params[:week_id]
      uw.major_id = params[:major_id]
      uw.type_id = 1
      if params[:is_haemaru] == "true"
        uw.is_haemaru = true
      else
        uw.is_haemaru = false
      end
      uw.save
    end

    if Userweek.where(:user_id =>user_id).where(:week_id => params[:week_id].to_i + 1 ).empty?
      uw = Userweek.new
      uw.user_id = user_id
      uw.week_id = params[:week_id].to_i + 1
      uw.major_id = params[:major_id]
      uw.type_id = 2
      if params[:is_haemaru] =="true"
        uw.is_haemaru = true
      else
        uw.is_haemaru = false
      end
      uw.save
    else
      uw = Userweek.where(:user_id =>user_id).where(:week_id => params[:week_id].to_i + 1 ).last
      uw.user_id = user_id
      uw.week_id = params[:week_id].to_i + 1
      uw.major_id = params[:major_id]
      uw.type_id = 2
      if params[:is_haemaru] == "true"
        uw.is_haemaru = true
      else
        uw.is_haemaru = false
      end
      uw.save
    end


    classmate_list1 = Array.new
    classmate_list2 = Array.new
    if params[:is_haemaru] == "true"
      common_week = Userweek.where(:week_id => params[:week_id]).where(:is_haemaru => true).all
      common_week.each do |x|
        classmate_list1 << x.user.name
      end
      common_week2= Userweek.where(:week_id => (params[:week_id].to_i+1) ).where(:is_haemaru => true).all
      common_week2.each do |x|
        classmate_list2 << x.user.name
      end
    elsif params[:major_id] == "major6" or params[:major_id] == "major7"
      common_week1_1 = Userweek.where(:week_id => params[:week_id]).where(:major_id => "major6").all
      common_week1_2 = Userweek.where(:week_id => params[:week_id]).where(:major_id => "major7").all
      common_week1_1.each do |x|
        classmate_list1 << x.user.name
      end
      common_week1_2.each do |x|
        classmate_list1 << x.user.name
      end
      common_week2_1= Userweek.where(:week_id => (params[:week_id].to_i+1) ).where(:major_id => "major6").all
      common_week2_2= Userweek.where(:week_id => (params[:week_id].to_i+1) ).where(:major_id => "major7").all
      common_week2_1.each do |x|
        classmate_list2 << x.user.name
      end
      common_week2_2.each do |x|
        classmate_list2 << x.user.name
      end

    else
      common_week = Userweek.where(:week_id => params[:week_id]).where(:major_id => params[:major_id]).all
      common_week.each do |x|
        classmate_list1 << x.user.name
      end
      common_week2= Userweek.where(:week_id => (params[:week_id].to_i+1) ).where(:major_id => params[:major_id]).all
      common_week2.each do |x|
        classmate_list2 << x.user.name
      end
    end

    data = {:classmate_list1 => classmate_list1, :classmate_list2 => classmate_list2}
    logger.info(data)
    render :json => data.to_json

  end



  def timeschedule_del
    user = User.where(:name => params[:name]).last
    uw = user.userweeks.where(:week_id => params[:week_id]).all
    uw.each do |x|
      x.destroy
    end

    classmate_list = Array.new
    data = {:classmate_list => classmate_list}
    logger.info(data)

    render :json => data.to_json

  end


  def timeschedule_del_double
    user = User.where(:name => params[:name]).last
    uw = user.userweeks.where(:week_id => params[:week_id]).all
    uw.each do |x|
      x.destroy
    end
    uw = user.userweeks.where(:week_id => params[:other_week_id]).all
    uw.each do |x|
      x.destroy
    end

    classmate_list = Array.new
    data = {:classmate_list => classmate_list}
    logger.info(data)

    render :json => data.to_json

  end
  def admin
    @users = User.all
  end
  def logout
      session[:name] = nil
      redirect_to "/home/index"
  end
end
