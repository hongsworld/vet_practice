a = Array.new
User.all.each do |u|
  schedule = Array.new
  u.userweeks.order(:week_id).all.each do |uw|
    schedule << uw.major_id.gsub("major10","2").gsub("major11","12").gsub("major12","3").gsub("major13","13").gsub("major14","14").gsub("major15","15").gsub("major16","16").gsub("major17","17").gsub("major18","18").gsub("major19","18").gsub("major20","18").gsub("major21","18").gsub("major22","19").gsub("major1","7").gsub("major2","6").gsub("major3","10").gsub("major4","4").gsub("major5","8").gsub("major6","1").gsub("major7","1").gsub("major8","11").gsub("major9","5")
  end
  a << schedule

end
puts a.inspect

File.open("export_result","w+") do |f|
  f.write(a)
end
