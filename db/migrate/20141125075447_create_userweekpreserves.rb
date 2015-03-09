class CreateUserweekpreserves < ActiveRecord::Migration
  def change
    create_table :userweekpreserves do |t|
      t.integer :user_id
      t.string :major_id
      t.integer :week_id
      t.boolean :is_haemaru
      t.integer :type_id
      t.string :dummy1
      t.string :dummy2
      t.string :dummy3
      t.string :dummy4
      t.string :dummy5
      t.string :dummy6

      t.timestamps
    end
  end
end
