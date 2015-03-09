#coding:utf-8
hash_value =  %w[일반외과(2주) 영상의학(2주) 정형외과(2주) 안과(2주) 임상병리(2주) 내과I(2주) 내과II(2주) 피부과(2주) 야생동물(2주) 외부실습III(2주) 외부실습IV(2주) 외부실습V(2주) 1학기방학I(1주) 1학기방학II(1주) 1학기방학III(1주) 2학기방학I(1주) 자기개발(2주)]


temp_array = [5,5,4,5,6,6,6,5,6,5,10,3,100,100,100,100,100,100,100,100,100,100,100,100,100,100]
restriction_hash = Hash.new
1.upto(25) do |n|
  restriction_hash["major#{n}"] = temp_array[n-1]
end

major_hash = Hash.new
1.upto(22) do |i|
  major_hash["major#{i}"] = hash_value[i-1]
end



User.all.each do |u|
  puts "이름 : #{u.name}"
  1.upto(39) do |n|
    if !u.userweeks.where(:week_id => n).empty?
      major_id = u.userweeks.where(:week_id => n).last.major_id
      major_name = major_hash[major_id]
      puts "#{n}주에실제 겹치는 인원"
      puts Userweek.where(:week_id => n).where(:major_id => major_id).count
      puts "#{n}주에 제한 인원"
      puts restriction_hash[major_id].to_i
      if Userweek.where(:week_id => n).where(:major_id => major_id).count > restriction_hash[major_id].to_i
        puts "이름 : #{u.name}"
        puts "주차 : #{n}주"
        puts "전공명 : #{major_name}"
        puts "경쟁자 명단"
        Userweek.where(:week_id => n).where(:major_id => major_id).each do |uw|
            puts uw.user.name
        end
        puts "----------------------------"
      end
    else
      if !n==18
      puts "#{n}주차 일정이 비어있습니다"
      end
    end
  end
puts "-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-="
end
puts "-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-="
puts "-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-="
puts "-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-="
puts "-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-="
puts "-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-="

